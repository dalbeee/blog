import { notion, infrastructure } from "@blog/core";

const useNotion = () => {
  const url = typeof window === "undefined" ? "http://backend:3000" : "/api";
  const config = { headers: { "access-control-allow-origin": "*" } };
  const httpClient = new infrastructure.Axios(url, config);
  const repository = new notion.repository.FrontendRepository(httpClient);
  // const useCase = new notion.useCase.FrontendUseCase(repository);

  return repository;
};

export default useNotion;
