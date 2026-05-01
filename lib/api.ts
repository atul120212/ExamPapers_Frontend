import axios from 'axios';
import { supabase } from './supabase';

export interface Paper {
  id: string;
  title: string;
  board: string;
  class: string;
  subject: string;
  year: number;
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
  views: number;
  downloads: number;
  description?: string;
}

export interface UploadPaperInput {
  title: string;
  board: string;
  class: string;
  subject: string;
  year: number;
  description?: string;
  file: File;
}

export async function fetchPapers(filters?: {
  subjects?: string[];
  boards?: string[];
  classes?: string[];
  years?: string[];
  sort?: string;
  page?: number;
  limit?: number;
}) {
  try {
    let query = supabase
      .from('papers')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.subjects && filters.subjects.length > 0) {
      query = query.in('subject', filters.subjects);
    }
    if (filters?.boards && filters.boards.length > 0) {
      query = query.in('board', filters.boards);
    }
    if (filters?.classes && filters.classes.length > 0) {
      query = query.in('class', filters.classes);
    }
    if (filters?.years && filters.years.length > 0) {
      query = query.in('year', filters.years.map(y => parseInt(y)));
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Paper[];
  } catch (error) {
    console.error('Error fetching papers:', error);
    return [];
  }
}

export async function uploadPaper(input: UploadPaperInput, userId: string) {
  try {
    // Upload file to Supabase Storage
    const fileName = `${Date.now()}-${input.file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('papers')
      .upload(`${userId}/${fileName}`, input.file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('papers')
      .getPublicUrl(`${userId}/${fileName}`);

    // Insert paper record
    const { data, error } = await supabase
      .from('papers')
      .insert({
        title: input.title,
        board: input.board,
        class: input.class,
        subject: input.subject,
        year: input.year,
        description: input.description,
        file_url: publicUrl,
        uploaded_by: userId,
        views: 0,
        downloads: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading paper:', error);
    throw error;
  }
}

export async function incrementViews(paperId: string) {
  try {
    const { data, error } = await supabase
      .from('papers')
      .update({ views: supabase.rpc('increment_views', { paper_id: paperId }) })
      .eq('id', paperId);

    if (error) throw error;
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}
