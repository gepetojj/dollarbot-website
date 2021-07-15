import { DocumentContext } from "next/document";

import Layout from "../components/Layout";
import { TokenPayload } from "../utils/types";
import { keepAuth } from "../utils/keepAuth";

export default function Wallet({ data }: { data: TokenPayload }) {
	return <Layout title="carteira" data={data}></Layout>;
}

export async function getServerSideProps({ req }: DocumentContext) {
	return await keepAuth(req);
}