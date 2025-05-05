#include <string>
#include <optional>
#include <ctime>

using namespace std;

class Bill
{
public:
    Bill(int id, int userId, string name, double amount,
         bool isMonthly, optional<tm> payDate,
         string description, string category)
        : id(id), userId(userId), name(name), amount(amount),
          isMonthly(isMonthly), payDate(payDate),
          description(description), category(category) {}

    int getId() const
    {
        return id;
    }

    int getUserId() const
    {
        return userId;
    }

    string getName() const
    {
        return name;
    }

    double getAmount() const
    {
        return amount;
    }

    bool getIsMonthly() const
    {
        return isMonthly;
    }

    optional<tm> getPayDate() const
    {
        return payDate;
    }

    string getDescription() const
    {
        return description;
    }

    string getCategory() const
    {
        return category;
    }

    void setId(int id)
    {
        this->id = id;
    }

    void setUserId(int userId)
    {
        this->userId = userId;
    }

    void setName(const string &name)
    {
        this->name = name;
    }

    void setAmount(double amount)
    {
        this->amount = amount;
    }

    void setIsMonthly(bool isMonthly)
    {
        this->isMonthly = isMonthly;
    }

    void setPayDate(optional<tm> payDate)
    {
        this->payDate = payDate;
    }

    void setDescription(const string &description)
    {
        this->description = description;
    }

    void setCategory(const string &category)
    {
        this->category = category;
    }

private:
    int id;
    int userId;
    string name;
    double amount;
    bool isMonthly;
    optional<tm> payDate;
    string description;
    string category;
};

extern "C"
{

    Bill *Bill_new(int id, int userId, const char *name, double amount,
                   bool isMonthly, tm *payDatePtr,
                   const char *description, const char *category)
    {
        optional<tm> payDate = payDatePtr ? optional<tm>(*payDatePtr) : nullopt;
        return new Bill(id, userId, string(name), amount, isMonthly,
                        payDate, string(description), string(category));
    }

    void Bill_delete(Bill *instance)
    {
        delete instance;
    }

    int Bill_getId(Bill *instance)
    {
        return instance->getId();
    }

    int Bill_getUserId(Bill *instance)
    {
        return instance->getUserId();
    }

    string Bill_getName(Bill *instance)
    {
        return instance->getName();
    }

    double Bill_getAmount(Bill *instance)
    {
        return instance->getAmount();
    }

    bool Bill_getIsMonthly(Bill *instance)
    {
        return instance->getIsMonthly();
    }

    tm *Bill_getPayDate(Bill *instance)
    {
        if (instance->getPayDate())
        {
            return new tm(instance->getPayDate().value());
        }
        return nullptr;
    }

    const char *Bill_getDescription(Bill *instance)
    {
        return instance->getDescription().c_str();
    }

    const char *Bill_getCategory(Bill *instance)
    {
        return instance->getCategory().c_str();
    }

    void Bill_setId(Bill *instance, int id)
    {
        instance->setId(id);
    }

    void Bill_setUserId(Bill *instance, int userId)
    {
        instance->setUserId(userId);
    }

    void Bill_setName(Bill *instance, const char *name)
    {
        instance->setName(string(name));
    }

    void Bill_setAmount(Bill *instance, double amount)
    {
        instance->setAmount(amount);
    }

    void Bill_setIsMonthly(Bill *instance, bool isMonthly)
    {
        instance->setIsMonthly(isMonthly);
    }

    void Bill_setPayDate(Bill *instance, tm *payDatePtr)
    {
        optional<tm> payDate = payDatePtr ? optional<tm>(*payDatePtr) : nullopt;
        instance->setPayDate(payDate);
    }

    void Bill_setDescription(Bill *instance, const char *description)
    {
        instance->setDescription(string(description));
    }

    void Bill_setCategory(Bill *instance, const char *category)
    {
        instance->setCategory(string(category));
    }
}