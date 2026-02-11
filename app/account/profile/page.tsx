import type { Metadata } from 'next'
import { UpdateProfileForm } from '@/app/_components/update-profile-form'
import SelectCountry from '@/app/_components/select-country'

export const metadata: Metadata = {
  title: 'Update profile',
}

export default function ProfilePage() {
  const countryFlag = 'pt.jpg'
  const nationality = 'portugal'

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">Update your guest profile</h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process faster and smoother. See
        you soon!
      </p>

      {/*
      Update Profile Form - клиентский компонент
      Select Counter - серверный компонент
      Клиентский не может рендерить серверный, способ только через props (children)
      Это работает, за счет - "Dependency Tree (Module Imports)"

      SelectCountry - серверный компонент импортится в серверном компоненте (page.tsx),
      его instance создается на сервере и передается уже готовый на клиенте
      */}
      <UpdateProfileForm>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  )
}
