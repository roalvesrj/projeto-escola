package br.com.t2m.escola.models;

import javax.validation.constraints.NotBlank;

public class Pessoa {

    @NotBlank(message = "O campo 'nome' não pode ser vazio ou nulo")
    protected String nome;
    @NotBlank(message = "O campo 'rg' não pode ser vazio ou nulo")
    protected String rg;
    @NotBlank(message = "O campo 'cpf' não pode ser vazio ou nulo")
    protected String cpf;
    protected String nomeSocial;
    @NotBlank(message = "O campo 'defFuncional' não pode ser vazio ou nulo")
    protected String defFuncional;
    @NotBlank(message = "O campo 'dataNascimento' não pode ser vazio ou nulo")
    protected String dataNascimento;
    @NotBlank(message = "O campo 'naturalidade' não pode ser vazio ou nulo")
    protected String naturalidade;
    @NotBlank(message = "O campo 'email' não pode ser vazio ou nulo")
    protected String email;
    @NotBlank(message = "O campo 'telefone' não pode ser vazio ou nulo")
    protected String telefone;
    @NotBlank(message = "O campo 'rua' não pode ser vazio ou nulo")
    protected String logradouro;
    @NotBlank(message = "O campo 'cep' não pode ser vazio ou nulo")
    protected String cep;
    @NotBlank(message = "O campo 'numero' não pode ser vazio ou nulo")
    protected String numero;
    protected String complemento;
    @NotBlank(message = "O campo 'bairro' não pode ser vazio ou nulo")
    protected String bairro;
    @NotBlank(message = "O campo 'cidade' não pode ser vazio ou nulo")
    protected String cidade;
    @NotBlank(message = "O campo 'estado' não pode ser vazio ou nulo")
    protected String estado;
    @NotBlank(message = "O campo 'genero' não pode ser vazio ou nulo")
    protected String genero;

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getNomeSocial() {
        return nomeSocial;
    }

    public void setNomeSocial(String nomeSocial) {
        this.nomeSocial = nomeSocial;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getNaturalidade() {
        return naturalidade;
    }

    public void setNaturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
    }

    public String getDefFuncional() {
        return defFuncional;
    }

    public void setDefFuncional(String defFuncional) {
        this.defFuncional = defFuncional;
    }
}
