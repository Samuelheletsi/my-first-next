import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be under 100 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(500, "Description must be under 500 characters"),
  category: z.string().min(3, "Category must be at least 3 characters").max(20, "Category must be under 20 characters"),
  link: z
    .string()
    .url({ message: "Please enter a valid image URL" })
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          const contentType = res.headers.get("content-type");
          return contentType?.startsWith('image/') ?? false;
        } catch {
          return false;
        }
      },
      { message: "URL must point to a valid image" }
    ),
  pitch: z.string().min(10, "Pitch must be at least 10 characters")
});
