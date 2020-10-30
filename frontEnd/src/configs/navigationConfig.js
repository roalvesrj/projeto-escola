import React from "react";
import * as Icon from "react-feather";

const navigationConfig = [
    {
        id: "inicio",
        title: "Início",
        type: "item",
        icon: <Icon.Home size={20} />
    },
    {
        id: "curso",
        title: "Cursos",
        type: "collapse",
        icon: <Icon.Layers size={20} />,
        children: [
            {
                id: "cursoListar",
                title: "Listar",
                type: "item",
                icon: <Icon.ArrowRight size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/curso"
            },
            {
                id: "cursoAdicionar",
                title: "Adicionar",
                type: "item",
                icon: <Icon.Plus size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/curso/adicionar"
            }
        ]
    },
    {
        id: "turma",
        title: "Turmas",
        type: "collapse",
        icon: <Icon.Box size={20} />,
        children: [
            {
                id: "turmaListar",
                title: "Listar",
                type: "item",
                icon: <Icon.ArrowRight size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/turma"
            },
            {
                id: "turmaAdicionar",
                title: "Adicionar",
                type: "item",
                icon: <Icon.Plus size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/turma/adicionar"
            }
        ]
    },
    {
        id: "disciplina",
        title: "Disciplinas",
        type: "collapse",
        icon: <Icon.BookOpen size={20} />,
        children: [
            {
                id: "disciplinaListar",
                title: "Listar",
                type: "item",
                icon: <Icon.ArrowRight size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/disciplina"
            },
            {
                id: "disciplinaAdicionar",
                title: "Adicionar",
                type: "item",
                icon: <Icon.Plus size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/disciplina/adicionar"
            }
        ]
    },
    {
        id: "professor",
        title: "Professores",
        type: "collapse",
        icon: <Icon.BookOpen size={20} />,
        children: [
            {
                id: "professorListar",
                title: "Listar",
                type: "item",
                icon: <Icon.ArrowRight size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/professor"
            },
            {
                id: "professorAdicionar",
                title: "Adicionar",
                type: "item",
                icon: <Icon.Plus size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/professor/adicionar"
            }
        ]
    },
    {
        id: "aluno",
        title: "Alunos",
        type: "collapse",
        icon: <Icon.User size={20} />,
        children: [
            {
                id: "alunoListar",
                title: "Listar",
                type: "item",
                icon: <Icon.ArrowRight size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/aluno"
            },
            {
                id: "alunoAdicionar",
                title: "Adicionar",
                type: "item",
                icon: <Icon.Plus size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/aluno/adicionar"
            }
        ]
    },
    {
        type: "groupHeader",
        groupTitle: "GESTÃO"
    },
    {
        id: "usuario",
        title: "Usuários",
        type: "collapse",
        icon: <Icon.Users size={20} />,
        children: [
            {
                id: "usuarioListar",
                title: "Listar",
                type: "item",
                icon: <Icon.ArrowRight size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/usuario"
            },
            {
                id: "usuarioAdicionar",
                title: "Adicionar",
                type: "item",
                icon: <Icon.Plus size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/usuario/adicionar"
            }
        ]
    },
    {
        type: "groupHeader",
        groupTitle: "RELATÓRIOS"
    },
    {
        id: "dataList",
        title: "Alunos",
        type: "collapse",
        icon: <Icon.List size={20} />,
        children: [
            {
                id: "listView",
                title: "Alunos por turma",
                type: "item",
                icon: <Icon.ArrowRight size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/data-list/list-view"
            },
            {
                id: "thumbView",
                title: "Alunos por curso",
                type: "item",
                icon: <Icon.ArrowRight size={12} />,
                permissions: ["admin", "editor"],
                navLink: "/data-list/thumb-view"
            }
        ]
    }
]

export default navigationConfig
