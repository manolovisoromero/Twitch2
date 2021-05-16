import Keycloak from 'keycloak-js'
 
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'


const keycloakConfig = {
    url: 'http://localhost:8091/auth', 
    realm: 'Twitch2', 
    clientId: 'Twitch2Frontend'

 }

const keycloak = new Keycloak(keycloakConfig);
 
export default keycloak

