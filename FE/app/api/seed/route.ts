// import { db, products } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {

  // await db.insert(products).values([
  //   {
  //     id: 1,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 2,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 3,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 4,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 5,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 6,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 7,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 8,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 9,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   },
  //   {
  //     id: 10,
  //     imageUrl:
  //       'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=',
  //     name: 'Joe',
  //     status: 'active',
  //     price: '1',
  //     stock: 1,
  //     availableAt: new Date()
  //   }
  // ]);
  // return Response.json({
  //   message: 'Uncomment to seed data after DB is set up.'
  // });
}
