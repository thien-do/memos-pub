export { getBlogProxy as proxy } from "./blog/proxy";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots\\.txt$).*)"],
};
