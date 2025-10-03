import type { Profile, Activity, ProfileId } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  FlaskConical,
  Code,
  BookHeart,
  Construction,
  Users,
  Atom,
  Languages,
  Blocks,
  BrainCircuit,
  GraduationCap,
} from "lucide-react";

const getImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id) || {
    imageUrl: "",
    imageHint: "",
  };

export const profiles: Record<ProfileId, Profile> = {
  engenheiro: {
    id: "engenheiro",
    name: "O Engenheiro Criativo",
    age: 11,
    description:
      "Raciocínio lógico-matemático e espacial avançado. Curioso, adora construir e programar.",
    avatar: getImage("engenheiro-avatar").imageUrl,
    avatarHint: getImage("engenheiro-avatar").imageHint,
    initials: "EC",
  },
  narrador: {
    id: "narrador",
    name: "O Narrador Imaginativo",
    age: 7,
    description:
      "Forte aptidão linguística e criativa. Adora criar histórias, desenhar e explorar mundos de fantasia.",
    avatar: getImage("narrador-avatar").imageUrl,
    avatarHint: getImage("narrador-avatar").imageHint,
    initials: "NI",
  },
};

export const activities: Activity[] = [
  {
    id: "lab-inventions",
    title: "Laboratório de Invenções",
    description: "Projete, construa e simule máquinas usando física e lógica.",
    Icon: FlaskConical,
    href: "#",
    profiles: ["engenheiro"],
    image: getImage("lab-inventions").imageUrl,
    imageHint: getImage("lab-inventions").imageHint,
  },
  {
    id: "studio-programming",
    title: "Estúdio de Programação",
    description:
      "Crie jogos, animações e desafios de xadrez usando programação em blocos (Scratch) e evolua até Python.",
    Icon: Code,
    href: "#",
    profiles: ["engenheiro"],
    image: getImage("studio-programming").imageUrl,
    imageHint: getImage("studio-programming").imageHint,
  },
  {
    id: "strategy-arena",
    title: "Arena de Estratégia",
    description: "Programe a IA para jogos de tabuleiro, resolva quebra-cabeças e crie estratégias matemáticas.",
    Icon: BrainCircuit,
    href: "#",
    profiles: ["engenheiro"],
    image: getImage("strategy-arena").imageUrl,
    imageHint: getImage("strategy-arena").imageHint,
  },
  {
    id: "quantum-explorer",
    title: "Explorador Quântico",
    description: "Descubra os segredos das partículas e da física nuclear.",
    Icon: Atom,
    href: "#",
    profiles: ["engenheiro"],
    image: getImage("physics-lab").imageUrl,
    imageHint: getImage("physics-lab").imageHint,
  },
  {
    id: "story-studio",
    title: "Estúdio do Contador de Histórias",
    description:
      "Crie personagens e narrativas com ajuda da IA para gerar imagens.",
    Icon: BookHeart,
    href: "/story-studio",
    profiles: ["narrador"],
    image: getImage("story-studio").imageUrl,
    imageHint: getImage("story-studio").imageHint,
  },
  {
    id: "language-adventure",
    title: "Aventura dos Idiomas",
    description: "Explore mundos, aprenda novas palavras e crie diálogos em outras línguas.",
    Icon: Languages,
    href: "#",
    profiles: ["narrador"],
    image: getImage("language-adventure").imageUrl,
    imageHint: getImage("language-adventure").imageHint,
  },
    {
    id: "world-builder",
    title: "Construtor de Mundos",
    description: "Use blocos de programação para criar seus próprios mundos e jogos.",
    Icon: Blocks,
    href: "#",
    profiles: ["narrador"],
    image: getImage("world-builder").imageUrl,
    imageHint: getImage("world-builder").imageHint,
  },
  {
    id: "logic-playground",
    title: "Playground de Lógica",
    description:
      "Resolva quebra-cabeças de física e aprenda sobre causa e efeito.",
    Icon: Construction,
    href: "#",
    profiles: ["narrador"],
    image: getImage("logic-playground").imageUrl,
    imageHint: getImage("logic-playground").imageHint,
  },
  {
    id: "collab-projects",
    title: "Projetos Colaborativos",
    description:
      "Una suas habilidades em desafios que exigem trabalho em equipe.",
    Icon: Users,
    href: "#",
    profiles: ["engenheiro", "narrador"],
    image: getImage("collab-projects").imageUrl,
    imageHint: getImage("collab-projects").imageHint,
  },
  {
    id: "tutor",
    title: "Professor Sabe Tudo",
    description: "Tire dúvidas sobre qualquer matéria do colégio e aprenda mais.",
    Icon: GraduationCap,
    href: "/tutor",
    profiles: ["engenheiro", "narrador"],
    image: getImage("tutor-ai").imageUrl,
    imageHint: getImage("tutor-ai").imageHint,
  }
];
