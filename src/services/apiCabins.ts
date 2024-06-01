import { FormCabin } from '../utils/types.t';
import supabase from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin: FormCabin) {
  const { data, error } = await supabase
    .from('cabins')
    .insert<FormCabin>([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}
