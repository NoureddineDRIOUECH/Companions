'use server';
import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";

export const createCompanion = async (formData: CreateCompanion)=>{
    const {userId: author} = await auth();
    const supabase = createSupabaseClient();
    const {data, error } = await supabase
        .from('companions')
        .insert({...formData, author})
        .select();
    if(error || !data) throw new Error(error?.message || 'Error creating companion')
    return data[0];
}
export const getAllCompanions = async ({limit = 10, page = 1 , subject , topic} : GetAllCompanions)=>{
    const supabase = createSupabaseClient();
    let query = supabase.from('companions').select();
    if (subject && topic){
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)


    }else if (subject){
        query = query.ilike('subject', `%${subject}%`)
    }else if (topic){
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }
    query = query.range((page-1)* limit, page*limit -1)
    const {data : companions, error } = await query
    if(error ) throw new Error(error?.message || 'Error getting all companions')
    return companions;

}
export const getCompanion = async (id: string)=>{
    const supabase = createSupabaseClient();
    const {data,error} =await supabase.from('companions').select().eq('id', id);
    if (error || !data) throw new Error(error?.message || 'Error getting companion')
    return data[0];
}
export  const addToSessionHistory = async  (companionId : string ) => {
    const {userId} = await auth();
    const supabase = createSupabaseClient();
    const {data, error} = await supabase.from('session_history').insert({
        companion_id : companionId,
        user_id : userId
    })
    if (error || !data) throw new Error(error?.message || 'Error adding to session history')
    return data;
}

export const getRecentSessions = async (limit = 10)=>{
    const supabase = createSupabaseClient();
    const {data, error} = await supabase.from('session_history').select(`companions:companion_id (*)`).limit(limit).order('created_at', {ascending: false});
    if (error || !data) throw new Error(error?.message || 'Error getting recent sessions')
    return data.map(({companions}) => companions)
}
export const getUserSessions = async (userId : string , limit = 10)=>{
    const supabase = createSupabaseClient();
    const {data, error} = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .limit(limit)
        .order('created_at', {ascending: false});
    if (error || !data) throw new Error(error?.message || 'Error getting recent sessions')
    return data.map(({companions}) => companions)
}
export const getUserCompanions = async (userId : string )=>{
    const supabase = createSupabaseClient();
    const {data, error} = await supabase
        .from('companions')
        .select()
        .eq('author', userId)
    if (error || !data) throw new Error(error?.message || 'Error getting recent sessions')
    return data
}

