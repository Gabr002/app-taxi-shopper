import { ok } from 'assert';
import React, { useState } from 'react';

const CPFInput: React.FC = () => {
  const [cpf, setCpf] = useState('');

  // Validação do CPF
  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cleanCPF.length !== 11 || /^(.)\1+$/.test(cleanCPF)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

    return true;
  };

  // Função para formatar o CPF
  const formatCPF = (value: string): string => {
    const cleanValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const formattedValue = cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2') // Insere o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Insere o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere o traço
    return formattedValue;
  };

  // Handle para mudança no input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpf(formatCPF(value)); // Atualiza o estado com o CPF formatado
  };

  // Handle para validação no blur
  const handleBlur = () => {
    if (cpf && !validateCPF(cpf)) {
      return;
    }
  };

  return (
    <div>
      <input
        id="idUser"
        type="text"
        placeholder="000.000.000-00"
        value={cpf}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>
  );
};

export default CPFInput;
