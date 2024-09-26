import Image from "next/image";
import Link from "next/link";
export default function Logo(): JSX.Element {
  return (
    <Link href="/">
      <Image
        alt="Evento logo"
        width={53}
        height={12}
        src="https://bytegrad.com/course-assets/react-nextjs/evento.png"
      />
    </Link>
  );
}
