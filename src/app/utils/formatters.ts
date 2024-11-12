export const formatCPF = (cpf: string) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

export const formatRG = (rg: string) => rg.replace(/\D/g, '').replace(/(\d{1})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
