import dynamic from "next/dynamic";
const Map = dynamic(() => import("./_components/DeckGLComponent"), {
	ssr: false,
});

const page = () => {
	return <Map />;
};

export default page;
