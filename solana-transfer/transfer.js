const {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");

// Import wallet
const wallet = require("./wallet.json");

// Create keypair from wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet.privateKey));

// Initialize connection to devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

async function transfer() {
  try {
    // Recipient address (they can change this)
    const to = new PublicKey("5XCdQVqopjAoVkNhkXWHmeHNhRS5bPiATUULy8FHDySX");

    // Create instruction
    const instruction = SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: to,
      lamports: LAMPORTS_PER_SOL * 0.1,
    });

    const instruction2 = SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: to,
      lamports: LAMPORTS_PER_SOL * 0.123,
    });

    // Create transfer instruction
    const transaction = new Transaction().add(instruction).add(instruction2);

    // Send transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      keypair,
    ]);

    // Log signature
    console.log(`Success! Transaction signature: ${signature}`);
    console.log(
      `View transaction: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

transfer();
