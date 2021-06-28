import { DocumentContext } from "next/document";

import { TokenPayload } from "../utils/types";
import Layout from "../components/Layout";
import { keepAuth } from "../utils/keepAuth";

export default function Wallet({ data }: { data: TokenPayload }) {
	return <Layout title="carteira" data={data}></Layout>;
}

export async function getServerSideProps({ req }: DocumentContext) {
	return await keepAuth(req);
}