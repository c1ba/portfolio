import {COLUMN_SPAN_CONFIG} from '@/app/theme/common';
import CinematicCarousel from '@/components/CinematicCarousel';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import client from '@/utils/cms/client';
import {processStrapiIcons} from '@/utils/cms/processors';

type ListDisplayType = 'CinematicCarousel';

type ProjectsListProps = {
  DisplayAs: ListDisplayType;
};

const ProjectsList = async ({DisplayAs}: ProjectsListProps) => {
  const cms = await client;
  const projects = await cms.queryProjects();
  const iconCodes = Array.from(
    new Set(
      projects
        .reduce<
          (string | undefined)[]
        >((accumulator, project) => [...accumulator, project.FrontendFramework, project.BackendFramework, project.APIType, project.Database], [])
        .filter(Boolean),
    ),
  ) as string[];
  const icons = processStrapiIcons(
    await cms.queryIcons({Code: {in: iconCodes}}),
  );
  const projectsCards = projects.map((project) => ({
    title: project.Title,
    url: project.URL,
    backgroundImage: project.BackgroundImage,
    icons: Array.from(
      new Set(
        [
          project.FrontendFramework,
          project.BackendFramework,
          project.APIType,
          project.Database,
        ].filter(Boolean) as string[],
      ),
    )
      .map((tech) => icons[tech.toLowerCase()])
      .filter(Boolean),
  }));

  return (
    <GridItem>
      <GridContainer>
        <GridItem columnSpan={COLUMN_SPAN_CONFIG}>
          {DisplayAs === 'CinematicCarousel' ? (
            <CinematicCarousel cards={projectsCards} />
          ) : (
            <></>
          )}
        </GridItem>
      </GridContainer>
    </GridItem>
  );
};

export default ProjectsList;
