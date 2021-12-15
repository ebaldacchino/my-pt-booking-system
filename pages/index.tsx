import type { GetServerSideProps } from 'next';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Layout from '../components/Layout';
import { authUserServerSideProps } from '../lib/auth';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const data = await authUserServerSideProps(context);
	if (data.props) {
		return {
			props: {
				givenName: data.props.givenName,
			},
		};
	}
	return { props: { ...data } };
};

interface Props {
	givenName: string | undefined;
}
export default function Home({ givenName }: Props) {
	return (
		<Layout user={givenName} title='Welcome' description='The best of the best'>
			<Hero />
			<Services />
		</Layout>
	);
}
