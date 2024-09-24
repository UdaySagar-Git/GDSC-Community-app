// import { S3Client } from '@aws-sdk/client-s3'
import { supabase } from '@/config/supabase'
// const {
//   data: { session },
// } = await supabase.auth.getSession();
// const client = new S3Client({
//   forcePathStyle: true,
//   region: process.env.BUCKET_REGION,
//   endpoint: process.env.BUCKET_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.BUCKET_ACCESS_KEY as string,
//     secretAccessKey: process.env.BUCKET_SECRET_KEY as string,
//     sessionToken: session?.access_token,
//   },
// })

export const uploadImage = async (file: File, type: "events" | "users", id: string) => {

  const path = `${type}/${id}`

  const { data, error } = await supabase.storage.from("images").upload(path, file, {
    upsert: false
  })

  if (error) {
    throw error
  }

  if(type === "events") {
    const { data: updatedEvent, error: updateError } = await supabase.from("events").update({
      image: data.path
    }).eq("id", id)

    if (updateError) {
      throw updateError
    }
    return updatedEvent
  } else if (type === "users") {
    const { data: updatedUser, error: updateError } = await supabase.from("users").update({
      image: data.path
    }).eq("id", id)

    if (updateError) {
      throw updateError
    }
    return updatedUser
  }

}

export const getImage = async (type: "events" | "users", id: string) => {
  const { data } = await supabase.storage.from("images").getPublicUrl(`${type}/${id}`)

  return data
}