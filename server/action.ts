"use server"
import { revalidatePath } from "next/cache";
import { db } from "."
import {blogPosts} from "./schema"
import { redirect } from "next/navigation";


export const getAllPost = async() => {
    const post = await db.query.blogPosts.findMany();

    if (!post || post.length === 0) {
        return { error: "No posts found"}
    }
    return { success: post}
}

export const createPost: (formData: FormData) => Promise<void> = async (formData) => {
    const title = formData.get("title")?.toString().trim();
    const content = formData.get("content")?.toString().trim();
    

    if (!title || !content) {
        console.log("No title found")
        return
    }
    await db.insert(blogPosts).values({ title, content })
    revalidatePath("/")
    redirect("/")
 }