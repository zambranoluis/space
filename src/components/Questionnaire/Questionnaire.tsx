"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/apiService";
import { Project, ProjectInformation } from "@/utils/dataInterfaces";
import Section from "./Section";

const Questionnaire = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [project, setProject] = useState<Project | null>(null);
  const [projectInfo, setProjectInfo] = useState<ProjectInformation | null>(null);

  // Función para obtener los datos del proyecto
  const fetchProjectData = useCallback(async () => {
    if (!projectId) return;
    try {
      const response = await apiService.getProjectById(projectId);
      const data = response;
      if (data) {
        setProject(data);
      }
    } catch (error) {
      console.log("Error fetching project data:", error);
    }
  }, [projectId]);

  // Ejecutar la solicitud cuando `projectId` cambie
  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  useEffect(() => {
    if (project) {
      // Extraer solo los datos que coinciden con ProjectInformation
      const projectInfoData: ProjectInformation = {
        _id: project._id,
        name: project.name,
        description: project.description,
        questionnaire: project.questionnaire,
        isActive: project.isActive,
      };

      setProjectInfo(projectInfoData);
    }
  }, [project]);

  return (
    <section>
      <Section project={projectInfo} />
    </section>
  );
};

export default Questionnaire;
