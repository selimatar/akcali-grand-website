import { CogIcon } from '@sanity/icons/Cog'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { isTurkishPhone } from '../../../lib/phone'
import { SOCIAL_PLATFORMS } from '../../../lib/social'
import { SINGLETONS } from '../../singletons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: SINGLETONS.siteSettings.title,
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'contact', title: 'İletişim', default: true },
    { name: 'location', title: 'Adres ve konum' },
    { name: 'social', title: 'Sosyal medya' },
    { name: 'seo', title: 'Varsayılan SEO' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Mekân adı',
      description: 'Sitenin her yerinde (sekme başlığı, paylaşımlar, telif satırı) kullanılır.',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().error('Mekân adı zorunludur.').max(60),
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      description:
        'Sitede yazdığınız gibi görünür, örn. “+90 (532) 123 45 67”. Aranabilir bağlantı otomatik oluşur.',
      type: 'string',
      group: 'contact',
      validation: (rule) =>
        rule
          .required()
          .error('Telefon zorunludur.')
          .custom((value) =>
            !value || isTurkishPhone(value) ? true : 'Geçerli bir Türkiye telefon numarası girin.',
          ),
    }),
    defineField({
      name: 'contactHours',
      title: 'Ulaşılabilir saatler',
      description: 'Telefonun altında küçük yazı olarak görünür. Örn. “Her gün 10:00 – 19:00”.',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'object',
      group: 'location',
      options: { collapsible: false },
      validation: (rule) => rule.required().error('Adres zorunludur.'),
      fields: [
        defineField({
          name: 'streetAddress',
          title: 'Mahalle, sokak ve numara',
          type: 'string',
          validation: (rule) => rule.required().error('Sokak adresi zorunludur.').max(120),
        }),
        defineField({
          name: 'district',
          title: 'İlçe',
          type: 'string',
          initialValue: 'Arsuz',
          validation: (rule) => rule.required().error('İlçe zorunludur.').max(40),
        }),
        defineField({
          name: 'city',
          title: 'İl',
          type: 'string',
          initialValue: 'Hatay',
          validation: (rule) => rule.required().error('İl zorunludur.').max(40),
        }),
        defineField({
          name: 'postalCode',
          title: 'Posta kodu',
          type: 'string',
          validation: (rule) =>
            rule.regex(/^\d{5}$/, { name: 'posta kodu' }).error('Posta kodu 5 haneli olmalıdır.'),
        }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Harita konumu',
      description:
        'Haritadaki işaret ve arama motorları için. Google Haritalar’da mekâna sağ tıklayıp çıkan enlem/boylamı buraya girin.',
      type: 'geopoint',
      group: 'location',
      validation: (rule) => rule.required().error('Harita konumu zorunludur.'),
    }),
    defineField({
      name: 'mapsUrl',
      title: '“Haritada aç” bağlantısı',
      description:
        'Google Haritalar’daki işletme sayfanızın bağlantısı. Boş bırakılırsa konumdan otomatik oluşturulur.',
      type: 'url',
      group: 'location',
      validation: (rule) => rule.uri({ scheme: ['https'] }).error('https:// ile başlamalıdır.'),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosyal medya hesapları',
      description:
        'Menüde, galeride ve sayfa altında gösterilir. Her platformdan en fazla bir hesap.',
      type: 'array',
      group: 'social',
      validation: (rule) => [
        rule.max(SOCIAL_PLATFORMS.length),
        rule.custom((links?: { platform?: string }[]) => {
          const platforms = (links ?? []).map((link) => link.platform).filter(Boolean)
          return new Set(platforms).size === platforms.length
            ? true
            : 'Her platform yalnızca bir kez eklenebilir.'
        }),
      ],
      of: [
        defineArrayMember({
          name: 'socialLink',
          title: 'Hesap',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: { list: [...SOCIAL_PLATFORMS], layout: 'radio', direction: 'horizontal' },
              validation: (rule) => rule.required().error('Platform seçin.'),
            }),
            defineField({
              name: 'url',
              title: 'Profil bağlantısı',
              description: 'Örn. https://instagram.com/akcaligardenofeden',
              type: 'url',
              validation: (rule) =>
                rule
                  .required()
                  .error('Profil bağlantısı zorunludur.')
                  .uri({ scheme: ['https'] })
                  .error('https:// ile başlamalıdır.'),
            }),
          ],
          preview: {
            select: { platform: 'platform', url: 'url' },
            prepare: ({ platform, url }) => ({
              title:
                SOCIAL_PLATFORMS.find((item) => item.value === platform)?.title ??
                'Platform seçilmedi',
              subtitle: url,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Varsayılan SEO',
      description: 'Bir sayfanın kendi SEO alanları boşsa bu değerler kullanılır.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: SINGLETONS.siteSettings.title }),
  },
})
