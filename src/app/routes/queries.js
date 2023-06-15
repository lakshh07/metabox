const baseUrlLifi = "https://staging.li.quest/v1";
const baseUrlCovalent = "https://api.covalenthq.com/v1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
  },
};

async function getAllTokens(selectedChain, walletAddress) {
  setLoading(true);
  await fetch(
    `${baseUrlCovalent}/${selectedChain.key}/address/${walletAddress}/balances_v2/`,
    options
  )
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data.data);
      setTokensData(data?.data?.items);
      setSelectedToken(data?.data?.items[0]);
      setLoading(false);
    });
}
