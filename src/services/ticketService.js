import { supabase } from './supabase';

export const ticketService = {

  // ─── UTILS ───────────────────────────────────────────────────────────────

  generateUniqueCode(nom) {
    const prefix = "EVT25";
    const cleanNom = nom.trim().toUpperCase().replace(/[^A-Z]/g, '').substring(0, 4);
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 17);
    const random = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${cleanNom}-${timestamp}-${random}`;
  },

  // ─── PENDING PAYMENT (avant ouverture widget) ─────────────────────────────

  /**
   * Créer un pending AVANT d'ouvrir Kkiapay
   * Appelle ça juste avant openKkiapayWidget()
   */
  async createPendingPayment({ transactionRef, candidateId = null, voteCount = null, nomComplet = null, ticketCode = null, amount }) {
    const { data, error } = await supabase
      .from('pending_payments')
      .insert([{
        transaction_id: transactionRef, // ID temporaire que tu génères toi-même
        candidate_id: candidateId,
        vote_count: voteCount,
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

  /**
   * Résoudre le pending après succès Kkiapay
   * transactionId = celui retourné par Kkiapay dans le callback success
   * transactionRef = ton ID temporaire que tu avais généré avant
   */
  async resolvePendingPayment(transactionRef, kkiapayTransactionId) {
    const { error } = await supabase
      .from('pending_payments')
      .update({
        transaction_id: kkiapayTransactionId, // on remplace le ref temporaire par le vrai ID Kkiapay
        status: 'done'
      })
      .eq('transaction_id', transactionRef);

    if (error) throw error;
  },

  /**
   * Marquer un pending comme failed
   */
  async failPendingPayment(transactionRef) {
    await supabase
      .from('pending_payments')
      .update({ status: 'failed' })
      .eq('transaction_id', transactionRef);
  },

  /**
   * Vérifier si un transactionId Kkiapay a déjà été traité (anti-double)
   */
  async isTransactionAlreadyDone(kkiapayTransactionId) {
    const { data } = await supabase
      .from('pending_payments')
      .select('id, status')
      .eq('transaction_id', kkiapayTransactionId)
      .eq('status', 'done')
      .maybeSingle();

    return !!data;
  },

  // ─── TICKETS ─────────────────────────────────────────────────────────────

  async saveTicketToSupabase(nomComplet, ticketCode) {
    const { data, error } = await supabase
      .from('tickets')
      .insert([{
        nom_complet: nomComplet,
        ticket_code: ticketCode,
        paiement_valide: true,
        qr_utilise: false
      }])
      .select()
      .single();

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
};