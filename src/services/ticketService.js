import { supabase } from './supabase'; 

export const ticketService = {
  generateUniqueCode(nom) {
    const prefix = "EVT25";
    const cleanNom = nom.trim().toUpperCase().replace(/[^A-Z]/g, '').substring(0, 4);
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:T.]/g, '').slice(0, 17);
    const random = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${cleanNom}-${timestamp}-${random}`;
  },

  async saveTicketToSupabase(nomComplet, ticketCode) {
    const { data, error } = await supabase
      .from('tickets') // Ta table créée précédemment
      .insert([
        { 
          nom_complet: nomComplet,
          ticket_code: ticketCode,
          paiement_valide: true,
          qr_utilise: false
        }
      ]);

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


/**
   * Vérifie un ticket et le marque comme utilisé si valide
   */
async verifyAndUseTicket(code) {
  // 1. Rechercher le ticket
  const { data: ticket, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('ticket_code', code)
    .single();

  if (error || !ticket) {
    return { status: 'invalid', message: 'Code QR inexistant' };
  }

  // 2. Vérifier s'il est déjà utilisé
  if (ticket.qr_utilise) {
    return { status: 'already_used', message: 'Ticket déjà scanné' };
  }

  // 3. Marquer comme utilisé
  const { error: updateError } = await supabase
    .from('tickets')
    .update({ qr_utilise: true })
    .eq('ticket_code', code);

  if (updateError) throw updateError;

  return { status: 'success', buyer: ticket.nom_complet };
},
  
};

