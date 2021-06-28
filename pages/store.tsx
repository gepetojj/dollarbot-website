import { DocumentContext } from "next/document";

import { TokenPayload } from "../utils/types";
import Layout from "../components/Layout";
import { keepAuth } from "../utils/keepAuth";

export default function Store({ data }: { data: TokenPayload }) {
	return <Layout title="loja" data={data}></Layout>;
}

export async function getServerSideProps({ req }: DocumentContext) {
	return await keepAuth(req);
}
