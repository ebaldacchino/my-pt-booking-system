import tw from 'twin.macro';

export const Main = tw.main`flex flex-col gap-2 h-screen items-center justify-center`;
export const Form = tw.form`flex flex-col gap-2`;
export const Input = tw.input`border px-1`;
export const Button = tw.button`bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 disabled:pointer-events-none disabled:bg-blue-200`;
export const LinkButton = tw.a`bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 text-center`;
export const A = tw.a`text-blue-500 hover:text-blue-600 hover:underline text-center`;
export const Err = tw.small`text-red-500`;
export const Title = tw.h1`text-2xl`;
export const SectionTitle = tw.h2`text-center text-4xl sm:text-5xl font-bold font-title mb-2`;