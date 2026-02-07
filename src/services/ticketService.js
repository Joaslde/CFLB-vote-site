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
  }
};