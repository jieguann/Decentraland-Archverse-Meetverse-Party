"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
// const serviceAccount = require("./serviceAccountKey.json");
const serviceAccount = {
    "type": "service_account",
    "project_id": "music-6bec7",
    "private_key_id": "f4b7fd33e96753309f5b0e528e278176498fd4aa",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDvs3chTZfJnFHL\n8zw+ySdimeNh3ncA5v2oB5AWP0tJB8UrbjKPDl/HsYOiLMDKwqfiJeRRaqQjSM+o\nTbQaCQlZWmVGV+asPjpG+AIRIpLTEe22bPN5UHrfxzKX60pXN0aXCkIiJWvAHUY5\nIHbFczxB5o+J4JuN+y/TRn9VaUit3FCnl7hwg3GfWl5t/ErsehXWskV75SKKw0IN\nWx+iA3NvhinmsdqFR/TjDGgKu7PHaWoj/OmL8gLaT6QLIrLE6HZjld3G45Fu/Q5R\ncfI08Mbor2Svp/G6hQwp+NN3MoH8ZxfS9gHdM1kwWo0Z5UJuLvw1YCNue2M4lqZ2\nCAsToj1ZAgMBAAECggEAD/XbcBJ+UZyQvruErqqOroxQHV9mfZ8j0ykjwTN4NBXq\nHUTyZV+f5YhOm0EPGkEhVBfRTtGCud26g/qejCA/aN1xwmAOejgPgdO4MYNjkt3N\n/fhdst12vQlCt2ZhlhKWZu62LhdfSBS67QlaFzYf1ESBmLzlpqvLyK3YQyvmPLs+\nfFyh4A93hGbaawh+5scwp0j/ZC7jqNRD1iDfMXcdG2jerd7l35y88OMdRdSI5fjw\nYm++AMyjFGOuaxleSwNI4OnCTYLsuSJmNHbFfy6rzGSGY0XiF0mX9j3+opm3ecMA\n7lw3ZkoOwmsmRzEtMTwnGJ1jb5H8/xHiCwX3lz7GzQKBgQD+jBZ0AXdp4YDX4tB5\ntny3UKA8/1Iq61+6KSN2zRy19lVLmYQepS2NW5FbIi96S6lzmt1La31jV8Uek9zA\na1/1nq8oPZ7eq8bYTr5BMUNPPtA8+s/Cgow3UqixdDUTWIym5KO8ROgYvPj/LaGz\nkX7xjDXywQX+J+NsRZ5uBSBuLQKBgQDxEa+v1p1png+RFKhww5Zbdbzt086u1e/o\nI0yvzsR5trti3t52hJf5WUdT5X5pAHH9pDRnQf03oIhzNGDOleymmLfhtbkihCO5\n6Zg5S9NsxwYi5KBBVg5vVKdUxB/R9h4hIACJPEe6n0wZyjYhaatI9k90RuMUfDnI\nqbO+sExzXQKBgAD+ixfo6Y6AUwCE4kuXauVMa1PRq4B/auBPSNQt+O69B5hEAUAd\nZRAoS2kPuR/BK+hHspWY1eSNczerXDFkOfu7ovOFShmUkjJGHHgkuR6WIDocwLMB\nz4pnyEDpM0vgDKyaOAmEO2PdWRumEfuhld1brtpD5sIXZcwGeZf0bSwBAoGACwCC\noyTJVFupXDa0JUlX4F60O6pyAVq0M0UBJ/jo0KE9VhrTzlbo1LF1ZufPaB1kFm5b\nEedaFiLWd2OJk4QWI9hOdBemFmQveTmm/95tDMbcidUjVzgFOqGDbYPx69QutdZP\nD/RXVbYVdAvdgpLfBVpwb98YWAP/YyATmv1Sz+UCgYAFyHk8RO/x5u9Zny6npqhp\nzS3Mol4G4HyFv1k9+xOJTVTSGOZ7KY5SG/iU4RTcsl9q98N7PhcJburEPDzLJ5xl\nTautVsmAz1XjwoALJ+g7jdkN92GsubHuDxpuWx6uFAQacySgn/Ywf72C7mjp1G7O\n3NgOETO+CvmxRZomaQYiBg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-lyi1s@music-6bec7.iam.gserviceaccount.com",
    "client_id": "105038117697206879033",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lyi1s%40music-6bec7.iam.gserviceaccount.com"
};
initializeApp({
    credential: cert(serviceAccount)
});
const db = getFirestore();
const timelineCollection = db.collection("timeline");
exports.default = timelineCollection;
