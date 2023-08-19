// Documentação de plugins
// https://swagger.io/docs/open-source-tools/swagger-ui/customization/plugin-api/

// O que isso faz??
// Pois é, o swagger-ui tem bem pouca doc em torno disso...
// Mas basicamente esse plugin intercepta a call de executeRequest
// e sobre escreve o método de fetch para capturar o response,
// ao capturar o response checa se o token está presente e
// se estiver autoriza e persiste o mesmo
export const createAutoAuthorizePlugin = () => ({
  statePlugins: {
    spec: {
      wrapActions: {
        executeRequest:
          (oriAction, { authActions }) =>
          (options) =>
            oriAction({
              ...options,
              fetch: async (...args) => {
                const res = await options.fetch(...args);
                const token = res.body?.access_token;
                if (token) {
                  authActions.authorizeWithPersistOption({
                    bearer: {
                      name: 'bearer',
                      schema: {
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                        type: 'http',
                      },
                      value: token,
                    },
                  });
                }
                return res;
              },
            }),
      },
    },
  },
});
