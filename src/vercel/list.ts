import { getVercel } from "./instance";

/** We only need domain apex now */
interface Domain {
  apex: string;
}

export async function listVercelDomains(): Promise<Domain[]> {
  const { project, vercel } = getVercel();

  const list: Domain[] = [];
  let until: number | null = null;

  do {
    const page = await vercel.projects.getProjectDomains({
      idOrName: project,
      limit: 100,
      until: until ?? undefined,
    });

    page.domains.forEach((domain) => {
      list.push({ apex: domain.apexName });
    });

    until = page.pagination.next;
  } while (until !== null);

  return list;
}
