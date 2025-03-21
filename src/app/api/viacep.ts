export interface AddressInfo {
  zipCode: string;
  uf: string;
  localidade: string;
}

const ViaCepAPI = async (value: string) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
    const data: AddressInfo = await response.json();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return error;
  }
};

export default ViaCepAPI;
