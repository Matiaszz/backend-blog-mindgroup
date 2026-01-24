import { PrismaClient } from "@prisma/client";
import { AppError } from "../error/AppError";
import { PostCreateDTO, PostResponseDTO } from "../schemas/dtos";

const db = new PrismaClient();

const WORDS_PER_MINUTE = 200;



export async function createPost(dto: PostCreateDTO, authorId: string, ) {
  const { title, summary, content, tags, categoryId } = dto;

  const category = await db.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new AppError("Category ID not found", 404);
  }

  const avgReadTimeInMinutes = calculateReadTime(dto.content);

  const post = await db.post.create({
    data: {
      title,
      summary,
      content,
      coverImage: undefined,
      categoryId,
      authorId,
      averageReadTimeInMinutes: avgReadTimeInMinutes,
      postTags: {
        create: tags.map(tagName => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName },
            },
          },
        })),
      },
    },
    select: getPostSelect()
  });


  return post as PostResponseDTO;
}

export async function uploadImage(postId: string, buffer: Buffer | undefined) {
  const post = await db.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new AppError('Post not found.', 404);
  }

  if (!buffer) {
    throw new AppError('File not sent', 400);
  }

  const imageBytes = new Uint8Array(buffer);

  const updated = await db.post.update({
    where: { id: postId },
    data: {
      coverImage: imageBytes,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePictureUrl: true,
        },
      },
      category: {
        select: {
          id: true,
          label: true,
        },
      },

      likes: {
        select: {
          id: true,
          userId: true,
          postId: true
        }
      },
      favorites: {
        select: {
          id: true,
          userId: true,
          postId: true
        }
      },

      postTags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return updated as PostResponseDTO;
}

export async function getPost(id: string) {
  const post = await db.post.findUnique({
    where: { id },
    select: getPostSelect()
  });

  if (!post) {
    throw new AppError('Post not found.', 404);
  }

  return post as PostResponseDTO;
}

export async function getPostCoverImage(id: string) {
  const post = await db.post.findUnique({
    where: { id },
    select: {
      coverImage: true
    }
  });

  if (!post) {
    throw new AppError('Post not found.', 404);
  }

  if (!post.coverImage){
    throw new AppError('Cover image not found.', 404)
  }
  
  return post.coverImage;
}

export async function getAllPosts() {
  const posts = await db.post.findMany({
    select: getPostSelect()
  });

  return posts as PostResponseDTO[];
}

function calculateReadTime(text: string): number {
  const words = text
    .trim()
    .split(/\s+/) // get only the text
    .filter(Boolean).length; // get only the non-falsy values


  // get the int part of this expression
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function getPostSelect() {
  return {
      id: true,
      title: true,
      summary: true,
      content: true,
      published: true,
      views: true,
      averageReadTimeInMinutes: true,
      createdAt: true,

      author: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePictureUrl: true,
        },
      },

      category: {
        select: {
          id: true,
          label: true,
        },
      },

      likes: {
        select: {
          id: true,
          userId: true,
          postId: true
        }
      },

      favorites: {
        select: {
          id: true,
          userId: true,
          postId: true
        }
      },

      postTags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    }
}