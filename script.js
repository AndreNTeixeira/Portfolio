document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  const errorDiv = document.getElementById("error");
  const repoDetails = document.getElementById("repo-details");

  loader.classList.remove("hidden");

  try {
    const repoRes = await fetch("https://api.github.com/users/AndreNTeixeira/repos");

    if (!repoRes.ok) throw new Error("Repositórios não encontrados.");

    const reposData = await repoRes.json();

    if (reposData.length === 0) {
      throw new Error("Nenhum repositório encontrado.");
    }

    reposData.forEach((repo) => {
      const div = document.createElement("div");
      div.classList.add("repo-item");

      const title = document.createElement("h2");
      title.textContent = repo.name;

      const desc = document.createElement("p");
      desc.textContent = repo.description || "Sem descrição.";

      div.appendChild(title);
      div.appendChild(desc);
      repoDetails.appendChild(div);
    });

    repoDetails.classList.remove("hidden");
  } catch (err) {
    errorDiv.textContent = err.message;
    errorDiv.classList.remove("hidden");
  } finally {
    loader.classList.add("hidden");
  }
});
