import Image from "next/image"
import Link from "next/link"
type Props = {}

const HeaderLogo = (props: Props) => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <p className="text-white text-2xl font-semibold">Money</p>
        <Image
          src="/logo.svg"
          alt="Money Vision"
          width={28}
          height={28}
        />
        <p className="text-white text-2xl font-semibold">Vision</p>
      </div>
    </Link>
  )
}

export default HeaderLogo