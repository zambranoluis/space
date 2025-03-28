"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Section from "./Section";

import { apiService } from "../../services/apiService";

import { GetProjectsByPurchasesId, Customer } from "../../utils/dataInterfaces";

interface ProjectsClientProps {
  projects: GetProjectsByPurchasesId[];
  customer: Customer | null;
}

interface ProjectsWorkerProps {}

const ProjectsClient: React.FC<ProjectsClientProps> = ({
  projects,
  customer,
}) => {
  const toggleProject = (id: number) => {
    const project = document.getElementById(`project${id}Container`);
    project?.classList.toggle("max-h-0");
  };
  const toggleStep = (projectId: number, stepId: number) => {
    const step = document.getElementById(
      `project${projectId}Step${stepId}Container`
    );
    const arrow = document.getElementById(`project${projectId}Arrow${stepId}`);
    arrow?.classList.toggle("rotate-180");
    step?.classList.toggle("max-h-0");
  };

  return (
    <section>
      <Section
        projects={projects}
        customer={customer}
        toggleProject={toggleProject}
        toggleStep={toggleStep}
      />
    </section>
  );
};

export default ProjectsClient;
