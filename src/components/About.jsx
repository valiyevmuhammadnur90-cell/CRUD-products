import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <div className="text">
      <h1>{t("About Page")}</h1>
    </div>
  );
}

export default About;
