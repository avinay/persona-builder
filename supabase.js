import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Persona CRUD operations
export class PersonaService {
  // Get all personas
  static async getAllPersonas() {
    try {
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching personas:', error)
      return { data: null, error }
    }
  }

  // Get a single persona by ID
  static async getPersonaById(id) {
    try {
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching persona:', error)
      return { data: null, error }
    }
  }

  // Create a new persona
  static async createPersona(personaData) {
    try {
      const { data, error } = await supabase
        .from('personas')
        .insert([personaData])
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating persona:', error)
      return { data: null, error }
    }
  }

  // Update an existing persona
  static async updatePersona(id, personaData) {
    try {
      const { data, error } = await supabase
        .from('personas')
        .update(personaData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating persona:', error)
      return { data: null, error }
    }
  }

  // Delete a persona
  static async deletePersona(id) {
    try {
      const { error } = await supabase
        .from('personas')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { data: true, error: null }
    } catch (error) {
      console.error('Error deleting persona:', error)
      return { data: null, error }
    }
  }

  // Search personas by name or occupation
  static async searchPersonas(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,occupation.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error searching personas:', error)
      return { data: null, error }
    }
  }
}
