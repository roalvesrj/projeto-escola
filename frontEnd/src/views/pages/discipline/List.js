import React, { useState, useEffect } from "react";
import { history } from "../../../history";
import {
    Row,
    Col,
    Alert,
    Card,
    CardBody,
    Input,
    Button,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from "reactstrap";
import DataTable from "react-data-table-component";
import {
    Plus,
    ChevronDown,
    Printer,
    Download,
    Search,
    Edit,
    Trash2
} from "react-feather";
import Breadcrumbs from "../../../components/BreadCrumb";
import "../../../assets/scss/pages/users.scss"

import disciplineService from "../../../services/disciplineService";

import "../../../assets/scss/pages/users.scss"

const CustomHeader = props => {
    return (
        <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex flex-wrap">
                <div className="mb-2 mb-md-0 mr-1 add-new">
                    <Button.Ripple color="primary" onClick={() => history.push("/disciplina/adicionar")}>
                        <Plus size={15} className="mr-1" />
                        Adicionar
                    </Button.Ripple>
                </div>
                <div className="dropdown actions-dropdown">
                    <UncontrolledButtonDropdown>
                        <DropdownToggle className="px-2 py-75" color="white">
                            Opções
                          <ChevronDown className="ml-50" size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag="a">
                                <Printer size={15} />
                                <span className="align-middle ml-50">Imprimir</span>
                            </DropdownItem>
                            <DropdownItem tag="a">
                                <Download size={15} />
                                <span className="align-middle ml-50">Exportar CSV</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </div>
            </div>
            <div className="position-relative has-icon-left mb-1">
                <Input value={props.value} onChange={e => props.handleFilter(e)} placeholder="buscar..." />
                <div className="form-control-position">
                    <Search size="15" />
                </div>
            </div>
        </div>
    )
}

const List = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([
        {
            name: "Nome",
            selector: "nome",
            sortable: true,
            cell: row => <p className="text-bold-500 mb-0">{row.nome !== null ? row.nome : ''}</p>
        },
        {
            name: "Turma",
            selector: "turma",
            sortable: true,
            cell: row => <p className="text-bold-500 mb-0">{row.turma !== null ? row.turma[0].nome : ''}</p>
        },
        {
            name: "Professor",
            selector: "professor",
            sortable: true,
            cell: row => <p className="text-bold-500 mb-0">{row.professor !== null ? row.professor.nome : ''}</p>
        },
        {
            name: "Carga horária (horas)",
            selector: "cargahoraria",
            sortable: true,
            cell: row => <p className="text-bold-500 mb-0">{row.cargaHoraria !== null ? row.cargaHoraria : ''}</p>
        },
        {
            name: "Ações",
            selector: "acoes",
            maxWidth: "100px",
            center: true,
            cell: row => (
                <div className="actions cursor-pointer">
                    <Edit
                        // className="mr-50"
                        style={{ 'margin-right': '1.5rem' }}
                        size={20}
                        onClick={() => history.push("/disciplina/editar/" + row.idDisciplina)}
                    />
                    <Trash2
                        size={20}
                        onClick={() => handleDeletar(row.idDisciplina, row.nome)}
                    />
                </div>
            )
        }
    ]);
    const [value, setValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const [mensagem, setMensagem] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");

    useEffect(() => {
        disciplineService.listarTodos()
            .then((response) => {
                setData(response.data.content);
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Ocorreu um erro ao acessar a API: " + error);
                setIsOpen(true);
            });
    }, []);
    console.log(data)

    const handleFilter = e => {
        let value = e.target.value;
        let passingData = data;
        let filteringData = filteredData;
        setValue(value);

        if (value.length) {
            filteringData = passingData.filter(item => {
                let startsWithCondition =
                    item.nome.toLowerCase().startsWith(value.toLowerCase())
                let includesCondition =
                    item.nome.toLowerCase().startsWith(value.toLowerCase())

                if (startsWithCondition) {
                    return startsWithCondition
                } else if (!startsWithCondition && includesCondition) {
                    return includesCondition
                } else {
                    return null
                }
            })
            setFilteredData(filteringData);
        };
    };

    const handleDeletar = (id, nome) => {
        let shouldDelete = window.confirm("Confirma a remoção da disciplina " + nome + "?");
        if (shouldDelete) {
            disciplineService.deletar(id)
                .then((response) => {
                    if (response.status === 200) {
                        setColor("success");
                        setMensagem("A disciplina " + nome + " foi removida com sucesso!");
                        setIsOpen(true);

                        disciplineService.listarTodos()
                            .then((response) => {
                                setData(response.data.content);
                            });
                    }
                })
                .catch((error) => {
                    setColor("danger");
                    setMensagem("Ocorreu um erro ao tentar remover a disciplina " + nome + ".");
                    setIsOpen(true);
                });
            setTimeout(() => {
                setIsOpen(false);
            }, 8000);
        };
    };

    return (
        <Row className="app-user-list">
            <Col sm="12">
                <Breadcrumbs
                    breadCrumbTitle="Lista de disciplinas"
                    breadCrumbParent="Disciplinas"
                    breadCrumbActive="Listar"
                />
            </Col>
            <Col sm="12">
                <Alert isOpen={isOpen} color={color}>{mensagem}</Alert>
            </Col>
            <Col sm="12">
                <Card>
                    <CardBody className="rdt_Wrapper">
                        <DataTable
                            className="dataTable-custom"
                            data={value.length ? filteredData : data}
                            columns={columns}
                            noHeader
                            pagination
                            subHeader
                            subHeaderComponent={
                                <CustomHeader value={value} handleFilter={handleFilter} />
                            }
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default List;