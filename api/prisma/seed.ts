
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = [
    { name: 'Fiction', description: 'Fictional literature' },
    { name: 'Science', description: 'Scientific books' },
    { name: 'Technology', description: 'Technology and computing' },
    { name: 'Self-Help', description: 'Personal development books' },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  const fiction = await prisma.genre.findUniqueOrThrow({ where: { name: 'Fiction' } });
  const science = await prisma.genre.findUniqueOrThrow({ where: { name: 'Science' } });
  const technology = await prisma.genre.findUniqueOrThrow({ where: { name: 'Technology' } });
  const selfHelp = await prisma.genre.findUniqueOrThrow({ where: { name: 'Self-Help' } });

  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '9780001', genreId: fiction.id },
    { title: 'The River Between', author: 'Ngugi wa Thiong’o', isbn: '9780002', genreId: fiction.id },
    { title: 'Animal Farm', author: 'George Orwell', isbn: '9780003', genreId: fiction.id },
    { title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie', isbn: '9780004', genreId: fiction.id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780005', genreId: fiction.id },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780006', genreId: science.id },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '9780007', genreId: science.id },
    { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780008', genreId: science.id },
    { title: 'The Origin of Species', author: 'Charles Darwin', isbn: '9780009', genreId: science.id },
    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780010', genreId: technology.id },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '9780011', genreId: technology.id },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780012', genreId: technology.id },
    { title: 'Code', author: 'Charles Petzold', isbn: '9780013', genreId: technology.id },
    { title: 'Atomic Habits', author: 'James Clear', isbn: '9780014', genreId: selfHelp.id },
    { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', isbn: '9780015', genreId: selfHelp.id },
    { title: 'Think and Grow Rich', author: 'Napoleon Hill', isbn: '9780016', genreId: selfHelp.id },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: book,
      create: book,
    });
  }

  console.log('Successfully seeded 4 genres and 16 books!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
