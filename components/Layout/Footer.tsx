import tw from 'twin.macro';

const FooterContainer = tw.footer`p-2 bg-gray-800 text-gray-400 gap-2`;
const Section = tw.section`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 `;
const Article = tw.article``;

const Footer = () => {
	return (
		<FooterContainer>
			<Section>
				<Article>About Us</Article>
				<Article>Sitemap</Article>
				<Article>Quick Links</Article>
				{/* <Article>More....links to pages</Article> */}
			</Section>
			<Section>
				<Article>© EJF {new Date().getFullYear()}</Article>
				<Article>Terms & Conditions</Article>
				<Article>Privacy Policy</Article>
				<Article>Cookie Policy</Article>
			</Section>
		</FooterContainer>
	);
};

export default Footer;
