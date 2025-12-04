import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <div className="text">
      <h1>{t("Home Page")}</h1>
    </div>
  );
}

export default Home;
