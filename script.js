const form = document.getElementById("vote-form");
const repoInput = document.getElementById("repo-url");
const emailInput = document.getElementById("email");
const formNote = document.getElementById("form-note");

window.addEventListener("load", () => {
  document.body.classList.add("ready");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const repoUrl = repoInput.value.trim();
  const email = emailInput.value.trim();

  if (!repoUrl) {
    formNote.textContent = "Paste a GitHub repository URL so people can vote on the proposal.";
    repoInput.focus();
    return;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(repoUrl);
  } catch {
    formNote.textContent = "That link does not look valid yet. Add a full GitHub URL.";
    repoInput.focus();
    return;
  }

  if (parsedUrl.hostname !== "github.com") {
    formNote.textContent = "Use a repository hosted on github.com so the vote stays public.";
    repoInput.focus();
    return;
  }

  formNote.textContent = email
    ? `Opening the vote repository now. Updates can be sent to ${email}.`
    : "Opening the vote repository now.";

  window.open(parsedUrl.toString(), "_blank", "noopener,noreferrer");
});
