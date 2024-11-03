import { databases, storage, DATABASE_ID, APPLICATION_FORM_COLLECTION_ID, APPLICATION_FORM_BUCKET_ID, Query ,FORM_CATEGORIES , CATEGORY_LABELS } from '@/lib/appwrite';

export class ApplicationFormService {
  async getActiveForms() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        APPLICATION_FORM_COLLECTION_ID,
        [
          Query.equal('isActive', true),
          Query.orderDesc('$createdAt')
        ]
      );
      
      // Transform and group the documents by category
      const forms = response.documents.map(doc => ({
        ...doc,
        fileUrl: storage.getFileView(APPLICATION_FORM_BUCKET_ID, doc.fileId)
      }));

      // Group forms by category
      const groupedForms = forms.reduce((acc, form) => {
        const category = form.category || FORM_CATEGORIES.OTHER;
        if (!acc[category]) {
          acc[category] = {
            label: CATEGORY_LABELS[category],
            forms: []
          };
        }
        acc[category].forms.push(form);
        return acc;
      }, {});

      // Convert to array and sort categories
      const categorizedForms = Object.entries(groupedForms)
        .map(([category, data]) => ({
          category,
          label: data.label,
          forms: data.forms
        }))
        .sort((a, b) => {
          // Custom sort order (you can adjust this)
          const order = Object.keys(FORM_CATEGORIES);
          return order.indexOf(a.category) - order.indexOf(b.category);
        });

      return categorizedForms;
    } catch (error) {
      console.error('Error fetching application forms:', error);
      throw error;
    }
  }
}

export const applicationFormService = new ApplicationFormService();
