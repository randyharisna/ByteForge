-- CreateTable
CREATE TABLE "courses" (
    "course_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "contents" (
    "content_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("content_id")
);

-- CreateTable
CREATE TABLE "subcontents" (
    "sub_content_id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "video_url" TEXT,

    CONSTRAINT "subcontents_pkey" PRIMARY KEY ("sub_content_id")
);

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcontents" ADD CONSTRAINT "subcontents_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("content_id") ON DELETE RESTRICT ON UPDATE CASCADE;
