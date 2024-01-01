export function CountDownCharacter({ character }: { character: number }) {
  return (
    <span className="rounded-lg bg-base-600 px-2 py-4 sm:px-3 sm:py-6">
      {character}
    </span>
  )
}
