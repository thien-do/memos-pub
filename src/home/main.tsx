import type { ReactElement } from "react";

export function HomeMain(): ReactElement {
  return (
    <main>
      <h1>Use your own domain</h1>
      <p>
        Add a TXT record at <code>_memos</code> on your domain. Set it to your
        GitHub path, for example <code>thien-do</code> or{" "}
        <code>thien-do/blog/notes</code>.
      </p>
      <p>Then enter the domain.</p>
      <form>
        <label>
          Domain
          <input name="host" type="text" placeholder="thien.do" />
        </label>
        <button type="submit">Continue</button>
      </form>
    </main>
  );
}
