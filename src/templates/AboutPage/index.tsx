import HeroWithProfilePicture from "@/components/Hero/HeroWithProfilePicture";
import { processStrapiHeroWithProfilePicture } from "@/utils/cms/processors";
import { StrapiHero } from "@/utils/cms/types";

type PageProps = {
    Hero: StrapiHero | [StrapiHero];
};

const AboutPage = ({data}: {data: PageProps}) => {
    console.log(data);
    const {Hero} = data;
    return (
        <>
            <HeroWithProfilePicture {...processStrapiHeroWithProfilePicture(Hero)} />
        </>
    );
};

export default AboutPage;