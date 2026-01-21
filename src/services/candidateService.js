import { supabase } from './supabase'

export const candidateService = {
  // Récupérer toutes les candidates (pour la galerie et la preview home)
  async getAllCandidates() {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('votes_count', { ascending: false }) // Les plus votées en premier

    if (error) {
      console.error('Erreur lors de la récupération des candidates:', error.message)
      throw error
    }
    return data
  },

  // Récupérer une seule candidate par son ID (pour la page de profil)
  async getCandidateById(id) {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', id)
      .single() // On ne veut qu'un seul objet

    if (error) {
      console.error(`Erreur lors de la récupération de la candidate ${id}:`, error.message)
      throw error
    }
    return data
  },
  // Ajoute cette fonction à ton objet candidateService
async incrementVotes(id, votes_count) {
  const { data, error } = await supabase.rpc('increment_candidate_votes', {
    candidate_id: id,
    amount: votes_count
  });

  if (error) throw error;
  return data;
}
}