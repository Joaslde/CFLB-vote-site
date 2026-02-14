import { supabase } from './supabase' // Assure-toi que ton client supabase est bien exporté ici

export const analyticService = {
  /**
   * Récupère toutes les candidates avec leurs votes
   */
  async getCandidatesStats() {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('votes_count', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  /**
   * Récupère le nombre de tickets validés (payés)
   */
  async getTicketsStats() {
    const { data, error, count } = await supabase
      .from('tickets')
      .select('*', { count: 'exact' })
      .eq('paiement_valide', true);
    
    if (error) throw error;
    return { data, count };
  },

  /**
   * Récupère l'évolution des ventes de tickets par jour
   * (Pour le graphique temporel)
   */
  async getDailyTicketSales() {
    const { data, error } = await supabase
      .from('tickets')
      .select('created_at')
      .eq('paiement_valide', true);

    if (error) throw error;

    // Groupement simple par date
    const groups = data.reduce((acc, ticket) => {
      const date = new Date(ticket.created_at).toLocaleDateString('fr-FR');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return groups;
  }
};