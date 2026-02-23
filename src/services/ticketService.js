import { supabase } from './supabase';

export const ticketService = {

  // ─── UTILS ────────────────────────────────────────────────────────────────

  generateUniqueCode(nom) {
    const prefix = "EVT25";
    const cleanNom = nom.trim().toUpperCase().replace(/[^A-Z]/g, '').substring(0, 4);
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 17);
    const random = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${cleanNom}-${timestamp}-${random}`;
  },

  // ─── TABLE TICKETS (ce que ScanView lit) ──────────────────────────────────

  async saveTicketToSupabase(nomComplet, ticketCode) {
    const { data, error } = await supabase
      .from('tickets')
      .insert([{
        nom_complet: nomComplet,
        ticket_code: ticketCode,
        paiement_valide: true,
        qr_utilise: false
      }]);

    if (error) throw error;
    return data;
  },

  saveToLocalStorage(ticketCode) {
    localStorage.setItem('event_ticket_code', ticketCode);
  },

  async getTicketByCode(code) {
    const { data, error } = await supabase
      .from('tickets')
      .select('nom_complet, ticket_code')
      .eq('ticket_code', code)
      .single();

    if (error) throw error;
    return data;
  },

  async verifyAndUseTicket(code) {
    const { data: ticket, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('ticket_code', code)
      .single();

    if (error || !ticket) {
      return { status: 'invalid', message: 'Code QR inexistant' };
    }

    if (ticket.qr_utilise) {
      return { status: 'already_used', message: 'Ticket déjà scanné' };
    }

    const { error: updateError } = await supabase
      .from('tickets')
      .update({ qr_utilise: true })
      .eq('ticket_code', code);

    if (updateError) throw updateError;

    return { status: 'success', buyer: ticket.nom_complet };
  },

  // ─── TABLE PENDING_PAYMENTS (audit + anti-double) ─────────────────────────

  async createPendingPayment({ transactionRef, nomComplet = null, ticketCode = null, amount }) {
    const { data, error } = await supabase
      .from('pending_payments')
      .insert([{
        transaction_id: transactionRef,
        candidate_id: candidateId,   // ← ajouter
        vote_count: voteCount,       // ← ajouter
        nom_complet: nomComplet,
        ticket_code: ticketCode,
        amount: amount,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async resolvePendingPayment(transactionRef, kkiapayTransactionId) {
    const { error } = await supabase
      .from('pending_payments')
      .update({
        transaction_id: kkiapayTransactionId,
        status: 'done'
      })
      .eq('transaction_id', transactionRef);

    if (error) throw error;
  },

  async failPendingPayment(transactionRef) {
    await supabase
      .from('pending_payments')
      .update({ status: 'failed' })
      .eq('transaction_id', transactionRef);
  },

  async isTransactionAlreadyDone(kkiapayTransactionId) {
    const { data } = await supabase
      .from('pending_payments')
      .select('id, status')
      .eq('transaction_id', kkiapayTransactionId)
      .eq('status', 'done')
      .maybeSingle();

    return !!data;
  },
};